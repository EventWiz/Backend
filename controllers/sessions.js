import formatResponse from '../helpers';

import models from '../database/models';

export async function createSession(req, res, next) {
  try {
    const {
      event_id,
      start_date,
      end_date,
      speaker,
      topic,
      venue,
      date,
    } = req.body;

    const session = await models.Session.create({
      event_id,
      start_date,
      end_date,
      speaker,
      topic,
      venue,
      date,
    });

    return formatResponse(res, { message: 'success', session }, 201);
  } catch (error) {
    next(error);
  }
}
