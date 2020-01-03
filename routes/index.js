import { Router } from 'express';
import Chatkit from '@pusher/chatkit-server';

import authRoutes from './auth';
import eventRoutes from './event';
import userRoutes from './user';

import models from '../database/models';

const router = Router();

const chatkit = new Chatkit({
  instanceLocator: 'v1:us1:affa5792-a7ac-46c2-b6cf-82c21b0c91f1',
  key: '1832bd33-d91d-4e13-a31f-1ce744adf9f5:sRbcTohZoafMEjsx2uUl9rzZPkeLAaMzzGRPZnPuGF8=',
});

router.get('/', (req, res) => res.status(200).json('Welcome'));
router.use('/auth', authRoutes);
router.use('/events', eventRoutes);
router.use('/users', userRoutes);

router.post('/event', async (req, res) => {
  try {
    const roomName = req.body.title;
    const pusherRoom = roomName.split(' ').join('_');

    chatkit.createRoom({
      id: `${pusherRoom}-1`,
      creatorId: 'eventz_admin',
      name: pusherRoom,
      customData: { foo: 42 },
    })
      .then(() => {
        console.log('Room created successfully');
      }).catch((err) => {
        console.log(err);
      });

    res.json(pusherRoom);
    // await models.Event.create(req.body);
  } catch (err) {
    console.log(err);
  }
});

router.get('/event/:id', (req, res) => {
  // retrieve info about event with the ID and its details, including the name of the room of the event
  // get details of user who clicked on the event from request
  // if the event is still active, then add the user to the room, else, dont
  // on the frontend
  // use the same username used for the request to subscribe the user to the room of the event
  // only subscribe when the page is open
});

router.post('/sessions/:eventId/:userId', (req, res) => {
  // get the event and figure the events room name
  // when the user selects the sessions they are interested in, then add them to the room of that event on pusher
});

function updateRoomsWithSessions() {
  // FOR CRON JOB FUNCTION
  // loop through all sessions together with their event start date, and return only sessions whose events are that day
  // go throught the array of session objects, calculate each sessions time, and for any session whose time seems to be 10mins from the current time, we send that session as an update
  // to the pusher room related to the event
}

export default router;
