require('dotenv').config();
const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  "name": String,
  "age": Number,
  "favoriteFoods": [String]
});

let Person = mongoose.model('Person', personSchema);
const createAndSavePerson = (done, personData) => {
  let person = new Person(personData || {
    "name": "People one",
    "age": 18,
    "favoriteFoods": ["Fruts", "Salad"]
  });

  person.save((err, data) => {
    if (!err) {
      done(null, data);
    } else {
      done(err);
    }
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  const promises = arrayOfPeople.map((p) => {
    return new Promise((resolve, reject) => {
      createAndSavePerson((err, data) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(data);
        }
      }, p);
    });
  });

  Promise.all(promises).then((data) => {
    return done(null, data)})
    .catch((error) => {
      return done(error, null)});
};

const findPeopleByName = (personName, done) => {
  Person.find({"name": personName}, (err, data) => {
    return done(err, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
return done(err, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    return done(err, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, data) => {
    if(err) {
      return done(err);
    }

    data.favoriteFoods.push(foodToAdd);
    data.save((err, data) => {
      return done(err, data);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {'new': true}, (err, data) => {
    return done(err, data);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    return done(err, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    return done(err, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
  .sort("name")
  .limit(2)
  .select("name favoriteFoods")
  .exec(done);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
