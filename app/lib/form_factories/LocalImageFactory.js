import t from 'tcomb-form-native';

import localImageTemplate from '../form_templates/LocalImageTemplate';

const Component = t.form.Component;

export default class LocalImageFactory extends Component {
  getTemplate() {
    return localImageTemplate;
  }
}

// LocalImageFactory.transformer = {

// }