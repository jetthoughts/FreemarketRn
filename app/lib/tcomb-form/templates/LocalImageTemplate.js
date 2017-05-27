import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, Button, StyleSheet } from 'react-native';

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

const renderPlaceholder = (hasError) => {
  let stylesPlacheholder = styles.imagePlaceholder;
  if (hasError) {
    stylesPlacheholder = StyleSheet.flatten([stylesPlacheholder, {borderColor: '#a94442'}]);
  }
  return (
    <View style={stylesPlacheholder}>
      <Text>Place for an Image</Text>
    </View>
  );
};

const renderImage = (imageSource) => {
  return (
    <Image
      source={{ uri: imageSource }}
      style={styles.image}
    />
  );
}

const renderImageBlock = ({imageSource, hasError}) => {
  if (imageSource) {
    return renderImage(imageSource);
  } else {
    return renderPlaceholder(hasError);
  }
};

const renderError = ({hasError, error, errorBlockStyle}) => {
  if (hasError && error) {
    return (
      <Text 
        accessibilityLiveRegion="polite" 
        style={errorBlockStyle}
      >
        {error}
      </Text>
    );
  } else {
    return null;
  }
}

export default function localImageTemplate(locals) {
  const { stylesheet, hasError, error} = locals;
  const errorBlockStyle = stylesheet.errorBlock;

  const value = locals.value || {};
  const imageSource = value.uri;

  return (
    <View style={styles.formImage}>
      <View style={styles.imageSection}>
        { renderImageBlock({imageSource, hasError}) }
      </View>
      <View style={styles.button}>
        <Button
          title="Select Image"
          onPress={() => locals.onChange()}
        />
      </View>
      { renderError({hasError, error, errorBlockStyle}) }
    </View>
  );
};
