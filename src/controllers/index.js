const models = require('../database/models');

const createProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const profile = await models.Profile.create({userId,...req.body});
        return res.status(201).json({
            profile,
          });
        } catch (error) {
          return res.status(500).json({error: error.message})
        }
}

const getAllProfiles = async (req, res) => {
    try {
      const profiles = await models.Profile.findAll({
        include: [
          {
            model: models.User,
            as: 'user'
          }
        ]
      });
      return res.status(200).json({ profiles });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  const getAllUsers = async (req, res) => {
    try {
      const users = await models.User.findAll();
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  const getSingleProfile = async (req, res) => {
    try {
      const { profileId } = req.params;
      const profile = await models.Profile.findOne({
        where: { id: profileId },
        include: [
          {
            model: models.User,
            as: 'user'
          }
        ]
      });
      if (profile) {
        return res.status(200).json({ profile });
      }
      return res.status(404).send('Profile with the specified ID does not exists');
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  const updateProfile = async (req, res) => {
    try {
      const { profileId } = req.params;
      const [ updated ] = await models.Profile.update(req.body, {
        where: { id: profileId }
      });
      if (updated) {
        const updatedProfile = await models.Profile.findOne({ where: { id: profileId } });
        return res.status(200).json({ profile: updatedProfile });
      }
      throw new Error('Profile not found');
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  const deleteProfile = async (req, res) => {
    try {
      const { profileId } = req.params;
      const deleted = await models.Profile.destroy({
        where: { id: profileId }
      });
      if (deleted) {
        return res.status(204).json({"message":"User deleted"});
      }
      throw new Error("Profile not found");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  const deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const deleted = await models.User.destroy({
        where: { id: userId }
      });

      await models.Profile.destroy({
        where: { userId:userId }
      });

      if (deleted) {
        return res.status(204).json({"message":"User deleted"});
      }
      throw new Error("User not found");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

module.exports = {
  createProfile,
  getAllProfiles,
  getSingleProfile,
  updateProfile,
  deleteProfile,
  getAllUsers,
  deleteUser
}