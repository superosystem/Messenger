import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'
import profileImage from './../../client/assets/images/profile-pic.png'

/**
 * Create User [POST]
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const create = async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    return res.status(200).json({
      message: "Successfully signed up!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

/**
 * Load user and append to request [GET]
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @param {*} id 
 * @returns 
 */
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id).populate('following', '_id name')
      .populate('followers', '_id name')
      .exec()
    if (!user)
      return res.status('400').json({
        error: "User not found"
      })
    req.profile = user
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve user"
    })
  }
}

/**
 * Load user profile [GET]
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined

  return res.json(req.profile)
}

/**
 * Find users [GET]
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const list = async (req, res) => {
  try {
    let users = await User.find().select('name email updated created')

    res.json(users)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

/**
 * Update user profile [UPDATE]
 * @param {*} req 
 * @param {*} res 
 */
const update = (req, res) => {
  let form = new formidable.IncomingForm()

  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded"
      })
    }

    let user = req.profile
    user = extend(user, fields)
    user.updated = Date.now()
    
    if (files.photo){
      user.photo.data = fs.readFileSync(files.photo.path)
      user.photo.contentType = files.photo.type
    }
    try {
      await user.save()
      user.hashed_password = undefined
      user.salt = undefined
      res.json(user)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

/**
 * Delete user [DELETE]
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const remove = async (req, res) => {
  try {
    let user = req.profile
    let deletedUser = await user.remove()
    deletedUser.hashed_password = undefined
    deletedUser.salt = undefined

    res.json(deletedUser)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

/**
 * Get photo profile user [GET]
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const photo = (req, res, next) => {
  if(req.profile.photo.data){
    res.set("Content-Type", req.profile.photo.contentType)

    return res.send(req.profile.photo.data)
  }
  next()
}

/**
 * Setup default photo [GET]
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd()+profileImage)
}

/**
 * Add following [POST]
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const addFollowing = async (req, res, next) => {
  try{
    await User.findByIdAndUpdate(req.body.userId, {$push: {following: req.body.followId}}) 
    next()
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

/**
 * Add followers [POST]
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const addFollower = async (req, res) => {
  try{
    let result = await User.findByIdAndUpdate(req.body.followId, {$push: {followers: req.body.userId}}, {new: true})
                            .populate('following', '_id name')
                            .populate('followers', '_id name')
                            .exec()
      result.hashed_password = undefined
      result.salt = undefined

      res.json(result)
    }catch(err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }  
}

/**
 * Remove following [POST]
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const removeFollowing = async (req, res, next) => {
  try{
    await User.findByIdAndUpdate(req.body.userId, {$pull: {following: req.body.unfollowId}}) 
    next()
  }catch(err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

/**
 * Remove followers [POST]
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const removeFollower = async (req, res) => {
  try{
    let result = await User.findByIdAndUpdate(req.body.unfollowId, {$pull: {followers: req.body.userId}}, {new: true})
                            .populate('following', '_id name')
                            .populate('followers', '_id name')
                            .exec() 
    result.hashed_password = undefined
    result.salt = undefined
    res.json(result)
  }catch(err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
  }
}


/**
 * Find all users [GET]
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const findPeople = async (req, res) => {
  let following = req.profile.following
  following.push(req.profile._id)
  try {
    let users = await User.find({ _id: { $nin : following } }).select('name')
    
    res.json(users)
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default {
  create,
  userByID,
  read,
  list,
  remove,
  update,
  photo,
  defaultPhoto,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  findPeople
}
