const router = require('express').Router();

const Trucks = require('../../../models/trucks-Model')
const Menu = require('../../../models/menu-Model')

// GET ALL TRUCKS REQUEST -> /trucks
router.get('/', (req, res) => {

    Trucks.findAll()
    .then(truck => {
        res.status(200).json(truck);
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed To Get Trucks'})
    })
        

})


// #### POST NEW TRUCK -> /trucks
router.post('/', (req, res) => {
    const truck = req.body
 
    Trucks.add(truck)
    .then (addTruck => {
        res.status(201).json(addTruck)
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to create a new Truck' });
    })
})


// #### GET REQUEST BY Trucks ID -> trucks/:id #### 
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Trucks.findById(id)
    .then(trucks => {
        if (trucks) {
            res.status(200).json(trucks)
        } else {
            res.status(404).json({ message: 'Could not find truck with the given id.' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get the Truck.' })
    })

})

// ### GET MENU per TRUCKS ####
router.get('/:id/menu', (req, res) => {
    const { id } = req.params;

    Menu.findMenuByTruck(id)
    .then(items => {
        if (items) {
            res.status(200).json(items)
        } else {
            res.status(404).json({ error: 'Could not find truck with id'})
        }
    })
    .catch(err => {
        res.status(500).json({ error: "Unable to retrieve the menu"})
    })
})

// #### POST REVIEW FOR TRUCK (DINER)
router.post('/:id/reviews', (req, res) => {
    const { id } = req.params;
    let newReview = req.body;
    newReview.truck_id = id

    Trucks.addTruckReview(newReview)
    .then(review =>{
        res.status(201).json(review);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'unable to add review' });
    })
})

// ### GET LISTING OF REVIEWS FOR TRUCK ###//#endregion
router.get('/:id/reviews', (req, res) => {
    const { id } = req.params;
   


    Trucks.getReviewsByTruck(id)
        .then(reviews => {
            res.status(200).json(reviews);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'An error occurred while loading reviews' });
        })
})



// #### UPDATE TRUCKS BY id -> trucks/:id ####

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Trucks.findById(id)
    .then(truck => {
        if (truck) {
            Trucks.update(changes, id)
            .then(updatedTruck => {
                res.json(updatedTruck);
            });
        } else {
            res.status(404).json({ message: 'Could Not Find Truck With The Given Id' });
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Failed To Update Truck Info."})
    })
})

// #### DELETE TRUCKS OBJECT by id -> trucks/:id ####

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Trucks.remove(id)
    .then(deleted => {
        if (deleted) {
            res.json({ Removed: deleted });
        } else {
            res.status(404).json({ message: 'Could Not Find Truck With The Given Id' });
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Failed To Delete Truck Info."})
    })
})

module.exports = router;