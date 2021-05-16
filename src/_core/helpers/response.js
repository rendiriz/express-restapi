const {
  ValidationError,
  NotFoundError,
  DBError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError
} = require('objection')

function ok (values, message, res) {
  return res
    .status(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      code: 200,
      error: 0,
      message: message,
      data: values
    })
}

function okList (values, pagination, message, res) {
  return res
    .status(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      code: 200,
      error: 0,
      message: message,
      pagination,
      data: values
    })
}

function errorNotFound (message, res) {
  return res
    .status(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      code: 400,
      error: 1,
      message: message,
      data: {}
    })
}

function errorToken (message, res) {
  return res
    .status(403)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      code: 403,
      error: 1,
      message: message,
      data: {}
    })
}

function errorHandler (err, res) {
  if (err instanceof ValidationError) {
    switch (err.type) {
      case 'ModelValidation':
        res.status(400).send({
          code: 400,
          error: 1,
          message: err.message,
          type: err.type,
          data: err.data
        })
        break
      case 'RelationExpression':
        res.status(400).send({
          code: 400,
          error: 1,
          message: err.message,
          type: 'RelationExpression',
          data: {}
        })
        break
      case 'UnallowedRelation':
        res.status(400).send({
          code: 400,
          error: 1,
          message: err.message,
          type: err.type,
          data: {}
        })
        break
      case 'InvalidGraph':
        res.status(400).send({
          code: 400,
          error: 1,
          message: err.message,
          type: err.type,
          data: {}
        })
        break
      default:
        res.status(400).send({
          code: 400,
          error: 1,
          message: err.message,
          type: 'UnknownValidationError',
          data: {}
        })
        break
    }
  } else if (err instanceof NotFoundError) {
    res.status(404).send({
      code: 404,
      error: 1,
      message: err.message,
      type: 'NotFound',
      data: {}
    })
  } else if (err instanceof UniqueViolationError) {
    res.status(409).send({
      code: 409,
      error: 1,
      message: err.message,
      type: 'UniqueViolation',
      data: {
        columns: err.columns,
        table: err.table,
        constraint: err.constraint
      }
    })
  } else if (err instanceof NotNullViolationError) {
    res.status(400).send({
      code: 400,
      error: 1,
      message: err.message,
      type: 'NotNullViolation',
      data: {
        column: err.column,
        table: err.table
      }
    })
  } else if (err instanceof ForeignKeyViolationError) {
    res.status(409).send({
      code: 400,
      error: 1,
      message: err.message,
      type: 'ForeignKeyViolation',
      data: {
        table: err.table,
        constraint: err.constraint
      }
    })
  } else if (err instanceof CheckViolationError) {
    res.status(400).send({
      code: 400,
      error: 1,
      message: err.message,
      type: 'CheckViolation',
      data: {
        table: err.table,
        constraint: err.constraint
      }
    })
  } else if (err instanceof DataError) {
    res.status(400).send({
      code: 400,
      error: 1,
      message: err.message,
      type: 'InvalidData',
      data: {}
    })
  } else if (err instanceof DBError) {
    res.status(500).send({
      code: 500,
      error: 1,
      message: err.message,
      type: 'UnknownDatabaseError',
      data: {}
    })
  } else {
    res.status(500).send({
      code: 500,
      error: 1,
      message: err.message,
      type: 'UnknownError',
      data: {}
    })
  }
}

module.exports = {
  ok,
  okList,
  errorToken,
  errorNotFound,
  errorHandler
}
