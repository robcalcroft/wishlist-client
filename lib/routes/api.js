import express from 'express';
import request from 'request';

let router = express.Router();

router.get('/token', (req, res) => {
    if(!req.query.code && !req.query.refresh_token) {
        return res.status(400).json({
            error: 'Missing authorization code or refresh token'
        });
    }
    request(
        {
            url: `${process.env.WISHLIST_BASE_URI}/api/1/auth/token`,
            method: 'POST',
            form: {
                'client_id': process.env.WISHLIST_CLIENT_ID,
                'client_secret': process.env.WISHLIST_CLIENT_SECRET,
                'grant_type': !req.query.refresh_token ? 'authorization_code' : 'refresh_token',
                'redirect_uri': process.env.WISHLIST_REDIRECT_URI,
                'code': !req.query.refresh_token ? req.query.code : null,
                'refresh_token': !req.query.refresh_token ? null : req.query.refresh_token
            }
        },
        (err, response, body) => {
            if(err || response.statusCode !== 200) {
                console.log(err, response, body);
                return res.status(500).json({
                    error: `Something went wrong ${err || body}`
                });
            }

            body = JSON.parse(body);

            res.status(200).json({
                access_token: body.access_token,
                refresh_token: body.refresh_token
            });
        }
    );
});


export default router;
