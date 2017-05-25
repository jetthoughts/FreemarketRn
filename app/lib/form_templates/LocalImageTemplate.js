import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, Button, StyleSheet } from 'react-native';

import { selectPhotoTapped } from '../../services/ImagePickerService';

const styles = StyleSheet.create({
  formImage: {
    alignItems: 'center',
  },
  imageSection: {
    width: 150,
    height: 150,
  },
  image: {
    flex: 1,
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderStyle: 'dotted',
    borderRadius: 1,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    width: 150,
  },
});

const renderPlaceholder = () => (
  <View style={styles.imagePlaceholder}>
    <Text>Place for an Image</Text>
  </View>
);

const renderImage = (imageSource) => {
  return (
    <Image
      source={{ uri: imageSource }}
      style={styles.image}
    />
  );
}

const selectPhoto = (onChange) => {
  selectPhotoTapped().then((localImage) => {
    onChange(localImage);
  });
}

const renderImageBlock = (imageSource) => {
  // const imageSource = this.props.locals.value.uri;
  if (imageSource) {
    return renderImage(imageSource);
  } else {
    return renderPlaceholder();
  }
};

export default function localImageTemplate(locals) {
  const stylesheet = locals.stylesheet;
  const errorBlockStyle = stylesheet.errorBlock;
  const error = locals.hasError && locals.error ? <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>{locals.error}</Text> : null;

  const value = locals.value || {};
  const imageSource = value.uri;

  return (
    <View style={styles.formImage}>
      <View style={styles.imageSection}>
        { renderImageBlock() }
      </View>
      <View style={styles.button}>
        <Button
          title="Select Image"
          onPress={() => selectPhoto(locals.onChange)}
        />
      </View>
      {error}
    </View>
  );
};
