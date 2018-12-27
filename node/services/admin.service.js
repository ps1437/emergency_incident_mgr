
// Show All Operation
module.exports.showDetails = (res, collectionName) => {
    collectionName.find({}).select("-__v").exec()
        .then((resObject) => {
            res.json(resObject);
        }).catch((err) => {
            console.log(err);
            res.json(err);
        })
}

// Create  Operation
module.exports.create = (newObject, res, collectionName) => {
    console.log("Inside create method........" + newObject)


    collectionName.create(newObject).exec()
        .then((resObject) => {
            console.log("created");
          return  res.json(resObject);
        }).catch((err) => {
            console.log(err);
            res.json(err);
        })
}

// Upadte  Operation
module.exports.update = (res, collectionName, query, objectToUpdate) => {
    collectionName.updateOne(query, objectToUpdate).exec()
        .then((resObject) => {
            res.json(resObject);
        }).catch((err) => {
            console.log(err);
            res.json(err);
        })
}





// Show a single record Operation
module.exports.findByID = (res, collectionName, parms) => {
    console.log(parms);
    collectionName.findOne(parms).exec()
        .then((resObject) => {
            res.json(resObject);
        }).catch((err) => {
            console.log(err);
            res.json(err);
        })
}


// Delete a single record Operation
module.exports.delete = (res, collectionName, parms) => {
    console.log('parms :' + parms);

    collectionName.deleteOne(parms).exec()
        .then((resObject) => {
            res.json(resObject);
        }).catch((err) => {
            console.log(err);
            res.json(err);
        })
}



