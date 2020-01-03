

import formatResponse from '../helpers';

import models from '../database/models';


async function getUserProfile(req, res, next) {
  try {
    const user = await models.User.findOne({
      where: { id: req.user.id },
      include: [
        {
          model: models.Event,
          as: 'events',
        },
        {
          model: models.Event,
          as: 'rsvps',
          through: { attributes: ['ticket_id'] },
        },
      ],
    });
    return formatResponse(res, { user });
  } catch (error) {
    next(error);
  }
}

export default getUserProfile;
