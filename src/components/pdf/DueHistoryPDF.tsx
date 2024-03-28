'use client';
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    // flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: '10px',
  },
  section: {
    margin: 10,
    padding: 10,
    // flexGrow: 1,
  },
  brand_section: {
    // display: 'flex',
    // justifyContent: 'center',
    width: '100%',
    margin: '0 auto',
    backgroundColor: 'red',
  },
  // image: {
  //   marginVertical: 15,
  //   marginHorizontal: 100,
  // },
});

// Create Document Component
export const DueHistoryPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
        }}
      >
        <Text style={{ fontSize: '60px' }}>Section #1</Text>
      </View>
      {/* <Image
        style={styles.image}
        src="/images/branding/hishabee.svg"
      /> */}

      <Text style={{ fontSize: '10px' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos explicabo
        placeat architecto exercitationem laboriosam est nesciunt magnam facere
        perferendis natus consectetur, impedit nostrum quos rerum hic, autem
        error iusto ab blanditiis. Debitis quisquam perferendis eius. Quam,
        animi eveniet sequi,
      </Text>
    </Page>
  </Document>
);

{
  /* <Page wrap>
  <Image src="/images/branding/hishabee.svg" />
</Page> */
}
