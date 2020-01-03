import { ErrorHandler } from 'express-error-bouncer';

import formatResponse from '../helpers';

import models from '../database/models';

export async function createSession(req, res, next) {
  try {
    const sessions = req.body.map(async body => {
      const {
        event_id,
        start_time,
        end_time,
        speaker,
        topic,
        venue,
        date,
      } = body;

      const session = await models.Session.create({
        event_id,
        start_time,
        end_time,
        speaker,
        topic,
        venue,
        date,
      });

      return session.dataValues;
    });
    const createdSessions = await Promise.all(sessions);

    return formatResponse(
      res,
      {
        message: `${sessions.length} session[s] created successfully.`,
        data: createdSessions,
      },
      201,
    );
  } catch (error) {
    next(error);
  }
}

export async function getSessionById(req, res) {
  const session = await models.Session.findOne({
    where: { id: req.params.sessionId },
  });
  if (!session) {
    throw new ErrorHandler(404, 'Session does not exist');
  }
  return formatResponse(res, { session });
}


export async function deleteSession(req, res, next) {
  try {
    const { sessionId } = req.params;

    const deleted = await models.Session.destroy({
      where: { id: sessionId },
    });

    if (deleted) {
      return formatResponse(res, { message: 'success' }, 204);
    }
    throw new ErrorHandler(404, 'Session does not exist');
  } catch (error) {
    next(error);
  }
}

export async function editSession(req, res, next) {
  try {
    const { sessionId } = req.params;

    if (!Object.keys(req.body).length) {
      throw new ErrorHandler(400, "You can't send an empty request");
    }
    const [updated] = await models.Session.update(req.body, {
      where: { id: sessionId },
    });

    if (updated) {
      const updatedSession = await models.Session.findOne({
        where: { id: sessionId },
      });
      return formatResponse(res, { message: 'success', updatedSession }, 200);
    }
    throw new ErrorHandler(404, 'Session does not exist');
  } catch (error) {
    next(error);
  }
}