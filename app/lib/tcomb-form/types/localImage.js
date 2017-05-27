import t from 'tcomb-form-native';

const LocalImage = t.struct({
  data: t.String,
  fileName: t.String,
  fileSize: t.Integer,
  height: t.Integer,
  isVertical: t.Bool,
  originalRotation: t.Integer,
  path: t.String,
  type: t.String,
  uri: t.String,
  width: t.Integer,
});

export default LocalImage;