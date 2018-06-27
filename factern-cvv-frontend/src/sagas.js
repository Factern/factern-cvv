import * as effects from 'redux-saga/effects';
import { delay } from 'redux-saga';

import graphqlSagas from './sagas/graphqlSagas';

const sagaDefs = [
  ...graphqlSagas,
];

function* trySaga(action, doWork) {
  yield effects.call(doWork, action);
}

function* handleSagaError(err, action, onFail) {
  if (onFail) {
    yield effects.call(onFail, err);
  } else {
    const delayByMs = 5 * 1000;
    yield delay(delayByMs);
  }
}

function* runSaga(action, doWork, onFail)/* : Generator<> */ {
  try {
    yield trySaga(action, doWork);
  } catch (err) {
    yield handleSagaError(err, action, onFail);
  }
}


function sagaFactory(sagaDef/* : SagaDefType */)/* : function */ {
  const onFail = sagaDef.onFail
    ? error => sagaDef.onFail && sagaDef.onFail(error)
    : null;

  const saga = function* saga()/* : Generator<> */ {
    // default redux-saga effect is takeLatest
    const sagaEffect = sagaDef.effect || effects.takeLatest;
    try {
      yield sagaEffect(
        sagaDef.actionType,
        function* runner(action) {
          yield runSaga(
            action,
            sagaDef.work,
            onFail,
          );
        },
      );
    } catch (err) {
      console.error(`SAGA FACTORY ERROR: ${err}`); // eslint-disable-line no-console
    }
  };

  // add this actionType prop for testing purposes, to find the intended saga
  saga.actionType = sagaDef.actionType;

  return saga;
}

const sagas/* : Array<Generator<>> */ = sagaDefs
  .map(sagaFactory)
  .map(saga => saga());

export default function* rootSaga()/* : Generator<> */ {
  yield sagas;
}
