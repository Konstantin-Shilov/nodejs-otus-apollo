import { NotFoundError, AuthError, AuthorizeError } from '../common/errors';

const errorHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(404).send({ error: err.message });
    return;
  }

  if (err instanceof AuthError) {
    res.status(401).send({ error: err.message });
    return;
  }

  if (err instanceof AuthorizeError) {
    res.status(403).send({ error: err.message });
    return;
  }

  console.error(err);
  res.status(500).send({ error: 'Opps!' });
};

export default errorHandler;
