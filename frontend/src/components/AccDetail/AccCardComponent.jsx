import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import './AccCardContent.css'
const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 250,
    maxHeight: 250,
    margin: 'auto',
    boxShadow: 'none',
    borderRadius: 1,
  },
}))

export const AccCard = React.memo(function NewsCard() {
  const styles = useStyles();
  const mediaStyles = useFourThreeCardMediaStyles();
//   const textCardContentStyles = useN01TextInfoContentStyles();
//   const shadowStyles = useBouncyShadowStyles();
  return (
    <Card className={cx(styles.root)}>
      <CardMedia
        className="AccPhoto"
        classes={mediaStyles}
        image={
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png'
        }
      />
      <CardContent className="AccCardContent">
        {/* <TextInfoContent
          overline={'March 20, 2019'}
          heading={'What happened in Thailand?'}
          body={
            'Kayaks crowd Three Sisters Springs, where people and manatees maintain controversial coexistence.'
          }
        /> */}
        {/* <h5>'What happened in Thailand?'</h5> */}
        <p>Taken at 2020-11-18</p>
      </CardContent>
    </Card>
  );
});

export default AccCard