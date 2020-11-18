import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Formik } from 'formik';
import { CustomButton } from '../../components';
import axios from 'axios';

export default function PostForm() {
  return (
    <>
      <View style={{ marginTop: 20 }}>
        <Formik
          initialValues={{
            title: '',
            thumbnail_url: '',
            caption: '',
          }}
          onSubmit={(values) => {
            console.log(values);
            const { title, thumbnail_url, caption } = values;
            axios({
              method: 'POST',
              headers: {
                access_token:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpcmFAbWFpbC5jb20iLCJpZCI6MiwiaWF0IjoxNjA1NjM3NzQxfQ.NynGX6tc_R_Sn8RSSznidMUVKofKvnCKkTiYP-JjRok',
              },
              data: {
                title,
                thumbnail_url,
                caption,
              },
            }).then(() => {});
          }}
        >
          {(props) => (
            <View style={{ marginHorizontal: 30, marginVertical: 7 }}>
              <TextInput
                style={styles.input}
                placeholder='Enter title'
                onChangeText={props.handleChange('title')}
                value={props.values.title}
              />
              <TextInput
                style={styles.input}
                placeholder='Enter thumbnail URL'
                onChangeText={props.handleChange('thumbnail_url')}
                value={props.values.thumbnail_url}
              />
              <TextInput
                style={styles.input}
                placeholder='Enter caption'
                onChangeText={props.handleChange('caption')}
                value={props.values.caption}
                multiline
              />
              <CustomButton
                title='Post'
                onPress={props.handleSubmit}
                btnStyle={{ width: '100%' }}
              />
            </View>
          )}
        </Formik>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: `#DDD`,
    padding: 10,
    fontSize: 18,
    borderRadius: 10,
    marginVertical: 5,
  },
});
