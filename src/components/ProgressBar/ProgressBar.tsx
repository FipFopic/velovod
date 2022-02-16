import React, {FC} from 'react'
import {View} from "react-native"
import {useStyleSheet} from "@ui-kitten/components"
import themedStyles from "./ProgressBar.style";

interface ProgressBarProps {
  value: number;
}

const ProgressBar: FC<ProgressBarProps> = ( { value } ) => {
  const styles = useStyleSheet(themedStyles)

  return (
    <View style={styles.outLine}>
      <View width={`${value}%`} style={styles.inLine}/>
    </View>
  );
};

export default ProgressBar
