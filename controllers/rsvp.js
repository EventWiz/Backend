import { ErrorHandler } from "express-error-bouncer";
import formatResponse from "../helpers";

import models from "../database/models";

async function rsvp(req, res, next) {
  try {
    const { event_id } = req.body;

    const { id } = req.user;

    const ticket_no = `#${Math.random()
      .toString(36)
      .substr(2, 6)
      .toUpperCase()}`;

    const ticket = await models.Ticket.create({
      event_id,
      ticket_no,
      used: false
    });

    const [rsvp, created] = await models.Rsvp.findOrCreate({
      where: { user_id: id, event_id },
      defaults: {
        event_id,
        user_id: id,
        ticket_id: ticket.id
      }
    });
    if (!created && rsvp) {
      throw new ErrorHandler(409, "You can rsvp once for this event");
    }
    const rsvpDetails = { ...rsvp.dataValues, ticket_no: ticket.ticket_no };

    return formatResponse(res, { message: "success", rsvpDetails }, 201);
  } catch (error) {
    next(error);
  }
}

export default rsvp;
