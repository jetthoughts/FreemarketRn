import t from 'tcomb-form-native';

import localImageTemplate from '../form_templates/LocalImageTemplate';
import { selectPhotoTapped } from '../../services/ImagePickerService';

const Component = t.form.Component;

export default class LocalImageFactory extends Component {
  getTemplate() {
    return localImageTemplate;
  }

  onChange() {
    selectPhotoTapped().then((localImage) => {
      super.onChange(localImage);
    });
  }
}