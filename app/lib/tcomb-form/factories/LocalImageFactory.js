import t from 'tcomb-form-native';
import ImagePicker from 'react-native-image-picker';

import localImageTemplate from '../templates/LocalImageTemplate';

const Component = t.form.Component;

export default class LocalImageFactory extends Component {
  getTemplate() {
    return localImageTemplate;
  }

  onChange() {
    const options = {
      quality: 1.0,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        //User cancelled photo picker
      } else if (response.error) {
        //ImagePicker Error
      } else if (response.customButton) {
        //User tapped custom button
      } else {
        super.onChange(response);
      }
    });
  }
}