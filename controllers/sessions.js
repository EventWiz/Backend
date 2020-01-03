import formatResponse from '../helpers';

import models from '../database/models';

export default async (req, res, next) => {
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
};
