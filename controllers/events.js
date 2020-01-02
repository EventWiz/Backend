import formatResponse from '../helpers';

import models from '../database/models';

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
      capacity,
    } = req.body;

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
      creator: id,
    });
    return formatResponse(res, { message: 'success', event }, 201);
  } catch (error) {
    next(error);
  }
}
