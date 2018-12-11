import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebaseHelper from 'firebase-functions-helper';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as uuid from 'uuid/v4';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const app = express();
const main = express();
const scoreCollection = 'highscore';

main.use('/api', app);
main.use(bodyParser.json());

main.set('x-powered-by', false);
app.set('x-powered-by', false);

// webApi is our firebase functions name
export const webApi = functions.https.onRequest(main);

// FIXME: don't use internal db ids, but uuid v4!
// TODO: validate input with AJV
// TODO: ensure no duplicate username!
// TODO: remove firebase-functions-helper package

app.get('/score', (req, res) => {
  firebaseHelper.firestore
    .backup(db, scoreCollection)
    .then((data: any) => res.status(200).send(data.highscore));
});

app.get('/score/:id', (req, res) => {
  firebaseHelper.firestore
    .getDocument(db, scoreCollection, req.params.id)
    .then((doc: any) => res.status(200).send(doc));
});

app.post('/score', (req, res) => {
  const obj = req.body;
  obj.id = uuid();
  firebaseHelper.firestore
    .createNewDocument(db, scoreCollection, obj);
  res.setHeader('Location', `/api/score/${obj.id}`);
  res.status(204);
});

app.patch('/score/:id', (req, res) => {
  firebaseHelper.firestore
    .updateDocument(db, scoreCollection, req.params.id, req.body);
  res.sendStatus(204);
});

app.delete('/score/:id', (req, res) => {
  firebaseHelper.firestore
    .deleteDocument(db, scoreCollection, req.params.id);
  res.sendStatus(200);
});

app.get('*', (req, res) => {
  res.status(404);
  res.json({error: 'not found'});
});

app.use((req, res) => {
  res.status(404);
  res.json({error: 'not found'});
});
