/* eslint-disable prefer-destructuring */
import React from 'react';
import { connect } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';

import SubmitButton from '../submitButton';
import FormInput from '../formInput';
import TagButton from '../tagButton';
import InputError from '../inputError';
import * as actions from '../../actions/articleActions';

import style from './articleForm.module.scss';

export default function ArticleForm(props) {
  const { formTitle, article, action } = props;
  const tagList = article ? article.tagList : null;
  const title = article ? article.title : null;
  const description = article ? article.description : null;
  const body = article ? article.body : null;
  const id = article ? article.slug : null;
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    reset,
    trigger,
    setError,
  } = useForm({
    mode: 'onBlur',
    defaultValues: { tagList },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  const textError = errors.text ? <InputError message={errors.text.message} /> : null;
  const actClassName = () => {
    if (errors.text) {
      return `${style.input} ${style.invalidInput}`;
    }
    return `${style.input}`;
  };

  const onSubmit = (data) => {
    const articleData = {
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: data.tagList,
      },
    };
    if (id) {
      action(articleData, id);
    } else if (!id) {
      action(articleData);
    }
    // action(articleData);
    reset();
    remove();
  };

  return (
    <form className={style.container} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={style.title}>{formTitle}</h3>
      <FormInput
        title="Title"
        placeholder="Title"
        name="title"
        value={title}
        errors={errors.title}
        reg={register('title', {
          required: 'Title field can not be empty',
        })}
      />
      <FormInput
        title="Short description"
        placeholder="Short description"
        name="description"
        value={description}
        errors={errors.description}
        reg={register('description', {
          required: 'Description field can not be empty',
        })}
      />
      <label className={style.label}>
        Text
        <textarea
          className={actClassName()}
          name="text"
          defaultValue={body}
          rows="10"
          cols="10"
          placeholder="Text"
          {...register('text', {
            required: 'Text field can not be empty',
          })}
        />
        {textError}
      </label>
      <div className={style.tags}>
        <h3 className={style.tagsTitle}>Tags</h3>
        {fields.map((item, index) => (
          <div className={style.tagsItem} key={item.id}>
            <FormInput
              placeholder="Tag"
              name={`tagList.${index}`}
              errors={errors[`tagList.${index}`]}
              reg={{ ...register(`tagList.${index}`) }}
            />
            <TagButton name="del" text="Delete" action={() => remove(index)} />
          </div>
        ))}
        <TagButton name="add" text="Add tag" action={() => append([''])} />
      </div>
      <SubmitButton text="Send" />
    </form>
  );
}
