import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Layout from './components/common/Layout';
import PassData from './components/PassData';
import OpenCVFaceDetector from './components/OpenCVFaceDetector';
// import Webcam from './components/Webcam';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperNoPaddingAround: {
    padding: theme.spacing(2, 1),
  },
});

const PASS_INPUT = 'pass_data_input';
const FACE_DETECTION = 'face_recognition';

class App extends React.Component {
  constructor(props) {
    super(props);
    const step = this.props.showForm ? PASS_INPUT : FACE_DETECTION;
    this.state = {
      step,
      loading: false,
      auth_result: null,
      pass_data: '',
      pinfl: '',
      birth_date: new Date().toISOString().split('T')[0],
    };
  }

  authenticate = (data) => {
    const { callback, showForm } = this.props;

    if (showForm) {
      const result = {
        birth_date: this.state.birth_date,
        agreed_on_terms: true,
        device: navigator.userAgent,
        photo_from_camera: {
          front: data,
        },
      };

      if (this.state.pinfl) result.pinfl = this.state.pinfl;
      else result.pass_data = this.state.pass_data;

      callback(result);
    } else {
      callback({
        agreed_on_terms: true,
        device: navigator.userAgent,
        photo_from_camera: {
          front: data,
        },
      });
    }
  };

  setPassData = (data) => {
    this.setState({
      ...data,
      step: FACE_DETECTION,
    });
  };

  render() {
    const { loading, step } = this.state;
    const { showForm } = this.props;
    return (
      <Layout>
        {showForm && step === PASS_INPUT && <PassData setPassData={this.setPassData} />}

        {step === FACE_DETECTION && (
          <OpenCVFaceDetector postData={this.authenticate} loading={loading} />
          // <Webcam postData={this.authenticate} loading={loading} />
        )}
      </Layout>
    );
  }
}

export default withStyles(styles)(App);
