import React, { useState } from "react";
import Message from "./Message";
import ProgressBar from "./Progress";
import Axios from "axios";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Chọn một file mp3 cần thêm");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [nameSong, setnameSong] = useState("");
  const [urlSong, seturlSong] = useState("");
  const [detailSong, setdetailSong] = useState("");
  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", nameSong);
    formData.append("audio_url", urlSong);
    formData.append("take_message", detailSong);
    console.log(detailSong);
    try {
      const res = await Axios.post("http://localhost:3000/api/audios/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (ProgressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            )
          );
          setTimeout(() => {
            setUploadPercentage(0);
            setMessage("");
            setUploadedFile({});
            setnameSong("");
            seturlSong("");
            setdetailSong("");
            setFileName("Chọn một file mp3 cần thêm");
          }, 15000);
        },
      });
      if (res.data == false) { setMessage("Bài hát đã tồn tại trong data"); }
      else {
        const { fileName, filePath } = res.data;
        setUploadedFile({ fileName, filePath });
        setMessage(`Uploaded ${res.data.nameSong}`);
      }
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <>
      <React.Fragment>
        {message ? <Message msg={message} /> : null}
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="Tên bài hát"
                fullWidth
                autoComplete="given-name"
                value={nameSong}
                onInput={e => setnameSong(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} my={-1000}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Link bài hát"
                fullWidth
                autoComplete="family-name"
                value={urlSong}
                onInput={e => seturlSong(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Chi tiết bài hát (ca sĩ và nhạc sĩ)"
                fullWidth
                autoComplete="shipping address-line1"
                value={detailSong}
                onInput={e => setdetailSong(e.target.value)}
              />
            </Grid>
            
           
              <Grid className="custom-file" item xs={12} sm={5} >
                <TextField
                  type="file"
                  accept=".mp3"
                  className="custom-file-input"
                  id="customFile"
                  onChange={onChange}
                />
                <label className="custom-file-label" htmlFor="customFile" type="mp3" >
                  {fileName}
                </label>
              </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                label="Xác nhận upload"
              />
            </Grid>
          </Grid>
          <ProgressBar percentage={uploadPercentage} />
          <input
            type="submit"
            value="Upload"
            className="btn btn-primary btn-block mt-4"
          />
        </form>
        {uploadedFile ? (
          <div className="row mt-5">
            <div className="col-md-6 m-auto">
              <h3 className="text-center"> {uploadedFile.fileName} </h3>
              <img style={{ width: "100%" }} src={uploadedFile.filePath} />
            </div>
          </div>
        ) : null}
      </React.Fragment>
    </>

  );
};

export default FileUpload;
