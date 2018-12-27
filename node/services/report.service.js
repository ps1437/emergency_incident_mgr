module.exports.reportbyIncident = (res, collectionName) => {

    collectionName.aggregate([
        {

            $group: {
                _id: '$incident_type',
                count: { $sum: 1 }
            }
        }
    ]).exec()
        .then((resObject) => {
            console.log("resObject : " + resObject);
            res.json(resObject);
        }).catch((err) => {
            console.log(err);
            res.json(err);
        })

}


module.exports.generateReport = (req, res, collectionName) => {

    const month = +req.body.month;
    const year = +req.body.year;

    collectionName.aggregate( //query today up to tonight
        [
            {
                $match: {
                    "incident_created_date": {
                        "$gt": new Date(year, month - 1, 01), "$lte": new Date(year, month, 01)
                    }
                }

            }
            ,
            {
                $group: {
                    _id: '$incident_type',
                    count: { $sum: 1 }
                }
            }
        ]
    )
        .exec()
        .then((resObject) => {


            console.log("resObject : " + resObject);
            res.json(resObject);
        }).catch((err) => {
            console.log(err);
            res.json(err);
        })

}