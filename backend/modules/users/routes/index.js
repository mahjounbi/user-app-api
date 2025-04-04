import { Router } from 'express';

import getAll from '../actions/getAll';
import getUserById from '../actions/getUserById';
import createUser from '../actions/createUser';
import updateUser from '../actions/updateUser';
import deleteUser from '../actions/deleteUser';

const router = Router();

router.get('/', getAll);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
