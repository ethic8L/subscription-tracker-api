import Subscribtion from '../models/subscribtion.model';


export const createSubscribtion =  async (req, res, next) => {
    try{
        const subscribtion = await Subscribtion.create({
            ...req.body,
            user: req.user._id
        });    

        res.status(201).json({ success: true, data: subscribtion });
    } catch (e) {
        next(e);
    }
}

export const getUserSubscribtions = async (req, res, next) => {
    try {
        if(req.user.id !== req.params.id){
            const error = new Error('You are not the owner of this account');
            error.statusCode = 401;
            throw error;
        }

        const subscribtions = await Subscribtion.find({ user: req.params.id });

        res.status(200).json({ success: true, data: subscribtions });
    } catch (e) {
        next(e);
    }
}
