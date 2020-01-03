import { ErrorHandler } from "express-error-bouncer";
import Chatkit from "@pusher/chatkit-server";
import formatResponse from "../helpers";

import { decodeToken } from "../helpers/auth";

import models from "../database/models";
import { decodeToken } from "../helpers/auth";

const chatkit = new Chatkit({
  instanceLocator: process.env.PUSHER_INSTANCE_LOCATOR,
  key: process.env.PUSHER_KEY
});

export async function createEvent(req, res, next) {
  try {
    const {
      type,
      img,
      title,
      desc,
      location,
      start_date,
      end_date,
      capacity
    } = req.body;

    const eventPusherRoomName = title.split(" ").join("_");

    const { id } = req.user;

    const event = await models.Event.create({
      type,
      img,
      title,
      desc,
      location,
      start_date,
      end_date,
      capacity,
      creator: id
    });

    await chatkit.createRoom({
      id: `${eventPusherRoomName}_1`,
      creatorId: "eventz_admin",
      name: eventPusherRoomName,
      customData: { foo: 42 }
    });

    return formatResponse(res, { message: "success", event }, 201);
  } catch (error) {
    next(error);
  }
}

export async function editEvent(req, res, next) {
  try {
    const { eventId } = req.params;
    const { id } = req.user;

    if (!Object.keys(req.body).length) {
      throw new ErrorHandler(400, "You can't send an empty request");
    }
    const [updated] = await models.Event.update(req.body, {
      where: { id: eventId, creator: id }
    });

    if (updated) {
      const updatedEvent = await models.Event.findOne({
        where: { id: eventId }
      });
      return formatResponse(res, { message: "success", updatedEvent }, 200);
    }
    throw new ErrorHandler(404, "Event does not exist");
  } catch (error) {
    next(error);
  }
}

export async function deleteEvent(req, res, next) {
  try {
    const { eventId } = req.params;
    const { id } = req.user;

    const deleted = await models.Event.destroy({
      where: { id: eventId, creator: id }
    });

    if (deleted) {
      return formatResponse(res, { message: "success" }, 204);
    }
    throw new ErrorHandler(404, "Event does not exist");
  } catch (error) {
    next(error);
  }
}

export async function getAllEvents(req, res) {
  const event = await models.Event.findAll({
    include: [
      {
        model: models.Session
      }
    ]
  });
  return formatResponse(res, { message: "success", event }, 200);
}

export async function getEventById(req, res) {
  const { authorization } = req.headers;

  const event = await models.Event.findOne({
    where: { id: req.params.eventId },
    include: [
      {
        model: models.Session
      }
    ]
  });
  if (req.headers.authorization) {
    const user = decodeToken(req.headers.authorization);

    const rsvp = await models.Rsvp.findOne({
      where: { user_id: user.__uuid, event_id: event.id }
    });
    if (rsvp) {
      // compare if the user is registered ffor the event before adding them to the room
      // function updateRoomsWithSessions() {
      // FOR CRON JOB FUNCTION
      // loop through all sessions together with their event start date, and return only sessions whose events are that day
      // go throught the array of session objects, calculate each sessions time, and for any session whose time seems to be 10mins from the current time, we send that session as an update
      // to the pusher room related to the event
      // }
      const { title } = event;
      const pusherRoom = title.split(" ").join("_");
      chatkit
        .addUsersToRoom({
          roomId: `${pusherRoom}_1`,
          userIds: [user.email]
        })
        .then(() => console.log("added"))
        .catch(err => console.error(err));
      return formatResponse(res, { event });
    }
    return formatResponse(res, {
      message: "success",
      event: {
        ...event.dataValues,
        registered: !!rsvp
      }
    });
  }
  return formatResponse(res, { message: "success", event }, 200);ç
}
