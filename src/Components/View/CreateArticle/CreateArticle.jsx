import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TinyMCE from 'react-tinymce';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { WithContext as ReactTags } from 'react-tag-input';
import { Container, Button, Message } from 'semantic-ui-react';
import * as articleActions from '../../../action/articleActions/articleActions';
import Header from '../Header/Header';
import './CreateArticle.scss';
import LoggedInHeader from '../Header/LoggedInHeader/LoggedInHeader';

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export class CreateArticle extends Component {
  state = {
    bannerUrl: 'https://res.cloudinary.com/jesseinit/image/upload/v1550654610/article-images/memphis-colorful.png',
    articleBody: '',
    articleTitle: '',
    tags: []
  };

  /* istanbul ignore next */
  onKeyUp = (e, editor) => {
    const newContent = editor.getContent();
    /* istanbul ignore next */
    if (!e.keyCode === 27) {
      return null;
    }
    /* istanbul ignore next */
    return this.setState({ articleBody: newContent });
  };

  handleInputChange = e => {
    return this.setState({ articleTitle: e.target.value });
  };

  handleArticleCreation = () => {
    const { createArticle, history } = this.props;
    createArticle(this.state, history);
  };

  /* istanbul ignore next */
  openUploadWidget = () => {
    /* istanbul ignore next */

    const myWidget = cloudinary.createUploadWidget(
      {
        cloudName: 'jesseinit',
        apiKey: '562442949728427',
        uploadPreset: 'jo81d6fh'
      },
      /* istanbul ignore next */
      (error, result) => {
        if (result.event === 'success') {
          this.setState({ bannerUrl: result.info.secure_url });
        }
      }
    );
    /* istanbul ignore next */
    myWidget.open();
  };

  render() {
    const { bannerUrl, tags } = this.state;
    const {
      article: { articleErrors, isCreating }
    } = this.props;

    return (
      <>
        <Helmet title="New Article - Authors Haven" />
        <Header>
          <LoggedInHeader />
        </Header>
        <Container fluid>
          <div
            style={{
              backgroundImage: `url(${bannerUrl})`
            }}
            className="articleBanner"
          >
            <Button
              basic
              onClick={this.openUploadWidget}
              className="uploadBannerBtn"
              content="Set Banner"
              icon="file image"
              size="tiny"
            />
            <div className="titleWrapper">
              <input className="article-title" onChange={this.handleInputChange} type="text" placeholder="Title" />
            </div>
          </div>
        </Container>
        <Container>
          <TinyMCE
            config={{
              menubar: false,
              plugins: 'link autoresize table media image ',
              file_picker_types: 'image',
              /* istanbul ignore next */
              file_picker_callback(cb) {
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.onchange = function onInputChange() {
                  const file = this.files[0];
                  const reader = new FileReader();
                  reader.onload = function onReaderLoad() {
                    const id = `blobid${new Date().getTime()}`;
                    const { blobCache } = tinymce.activeEditor.editorUpload;
                    const base64 = reader.result.split(',')[1];
                    const blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);
                    cb(blobInfo.blobUri(), { title: file.name });
                  };
                  reader.readAsDataURL(file);
                };
                input.click();
              },
              /* istanbul ignore next */
              images_upload_handler(blobInfo, success, failure) {
                const formData = new FormData();
                formData.append('file', blobInfo.blob());
                formData.append('upload_preset', 'jo81d6fh');
                axios
                  .post('https://api.cloudinary.com/v1_1/jesseinit/image/upload', formData, {
                    headers: {
                      'X-Requested-With': 'XMLHttpRequest'
                    }
                  })
                  .then(res => success(res.data.secure_url))
                  .catch(e => failure(e.response.data));
              },
              default_value: '14px',
              autoresize_min_height: '150',
              autoresize_max_height: '750',
              autoresize_bottom_margin: 5,
              statusbar: false,
              fontsize_formats: '12px 14px 16px 18px 24px 36px 48px',
              toolbar:
                'undo redo | insert | styleselect | fontselect fontsizeselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent table | link image media'
            }}
            onKeyup={this.onKeyUp}
          />
          <Container>
            <ReactTags
              tags={tags}
              handleDelete={i => {
                /* istanbul ignore next */
                this.setState({
                  tags: tags.filter((tag, index) => index !== i)
                });
              }}
              handleAddition={tag => {
                /* istanbul ignore next */
                this.setState(state => ({ tags: [...state.tags, tag] }));
              }}
              delimiters={delimiters}
            />
          </Container>
          <br />
          {articleErrors.length ? <Message negative list={[...articleErrors]} /> : null}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '100px' }}>
            {isCreating ? (
              <Button
                loading
                disabled
                content="Publish Article"
                style={{ backgroundColor: '#2fb5ee', color: '#fff' }}
              />
            ) : (
              <Button
                id="submitArticle"
                onClick={this.handleArticleCreation}
                content="Publish Article"
                style={{ backgroundColor: '#2fb5ee', color: '#fff' }}
              />
            )}
            <Button basic content="Save as Drafts" />
          </div>
        </Container>
      </>
    );
  }
}

CreateArticle.propTypes = {
  article: PropTypes.oneOfType([PropTypes.object]),
  createArticle: PropTypes.func.isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired
};

CreateArticle.defaultProps = {
  article: {}
};

const mapStateToProps = state => ({
  article: state.article
});

const mapDispatchToProps = {
  createArticle: articleActions.createArticle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateArticle);
