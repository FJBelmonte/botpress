import cx from 'classnames'
import { FormData } from 'common/typings'
import React, { FC, Fragment } from 'react'
import Dotdotdot from 'react-dotdotdot'

import { lang } from '../../../translations'
import MarkdownContent from '../../../MarkdownContent'

import style from './style.scss'
import { ItemProps } from './typings'

const ContentAnswer: FC<ItemProps> = ({ content, onEdit, active }) => {
  const renderCardOrImg = ({ image, title }: FormData): JSX.Element => {
    return (
      <div className={style.contentImgWrapper}>
        {image && <div style={{ backgroundImage: `url('${image}')` }} className={style.img}></div>}
        <div className={style.textWrapper}>
          <Dotdotdot clamp={3}>{title}</Dotdotdot>
        </div>
      </div>
    )
  }

  const renderContent = (): JSX.Element | string => {
    switch (content.contentType) {
      case 'image':
      case 'card':
        return renderCardOrImg(content)
      case 'carousel':
        return renderCardOrImg(content.items?.[0] || {})
      case 'suggestions':
        return (
          <Dotdotdot clamp={3}>{(content.choices as FormData[]).map(choice => choice.title).join(' · ')}</Dotdotdot>
        )
      default:
        const variationsCount = (content.variations as FormData[])?.filter(Boolean)?.length
        return (
          <Fragment>
            <Dotdotdot clamp={!!variationsCount ? 2 : 3}>
              <MarkdownContent markdown={content.markdown as boolean} content={content.text as string} />
            </Dotdotdot>
            {!!variationsCount && (
              <span className={style.extraItems}>
                + {variationsCount} {lang('module.builtin.types.text.alternative_plural')}
              </span>
            )}
          </Fragment>
        )
    }
  }

  return (
    <button
      className={cx('content-wrapper', style.contentWrapper, {
        [`${style.active} active`]: active,
        [style.carousel]: content.contentType === 'carousel'
      })}
      onClick={onEdit}
    >
      <span className={cx(style.content, 'content')}>{renderContent()}</span>
    </button>
  )
}

export default ContentAnswer
