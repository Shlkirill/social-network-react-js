import React, { useState } from 'react';
import Loading from '../../../common/loading/loading';
import styles from './ProfileInfo.module.css'
import photoDefault from '../../../img/empty-avatar.png'
import { BottonToggleFollow } from '../../../common/toggleFollow/BottonToggleFollow';
import ProfileStatus from './ProfileStatus';
import { NavLink} from 'react-router-dom';

const ProfileInfo = (props) => {
  console.log(props.profile)

  let [uploadMode, setpUploadMode] = useState(false);

  if (!props.profile) {
    return <Loading />
  }

  let onUploadMode = () => {
    setpUploadMode(true);
  }
  let offUploadMode = (e) => {
    if (!e.target.dataset.click) return
    setpUploadMode(false);
  }
  let onToggleFollow = () => {
    props.togglefollowUser(props.profile.userId, props.followed);
  };
  let onUploadanAvatar = (e) => {
    if (e.target.previousSibling.files.length > 0) {
      props.putAvatarToServer(e.target.previousSibling.files[0]);
      setpUploadMode(false);
    }
  };
  return (
    <div>
      <img src='http://dgdesign.ru/uploads/posts/2018-05/1525700405_shapka-sayta-tehnologii-2114654127851.jpg' className={styles.image} />
      <div className={styles.user}>
        <div className={styles.userAvatarAndFollow}>
          <div>
            <img src={props.profile.photos.large || photoDefault} className={styles.avatar} />
          </div>
          <div>
            {props.profile.userId !== props.authId ?
              BottonToggleFollow('ONE_USER', onToggleFollow, props.followed, props.isProgress, props.id) :
              <div>
                <button onClick={onUploadMode}>Upload New Avatar</button>
              </div>}
          </div>
        </div>
        <div className={styles.info}>
          <h4>{props.profile.fullName}</h4>
          <p><ProfileStatus status={props.status} getUpdateSatus={props.getUpdateSatus}
            getUserStatus={props.getUserStatus} authId={props.authId} userId={props.profile.userId} /></p>
          <p><span>LookingForAJob:</span> {props.profile.lookingForAJob?'Yes':'No'}</p>
          <p><span>LookingForAJobDescription:</span> {props.profile.lookingForAJobDescription}</p>
          <p><span>About me:</span> {props.profile.aboutMe}</p>
          <div className={styles.social}>
            {props.profile.contacts.facebook ? <a href={props.profile.contacts.facebook}><i class="fab fa-facebook-square"></i></a> : null}
            {props.profile.contacts.website ? <a href={props.profile.contacts.website}><i class="far fa-window-restore"></i></a> : null}
            {props.profile.contacts.vk ? <a href={props.profile.contacts.vk}><i class="fab fa-vk"></i></a> : null}
            {props.profile.contacts.twitter ? <a href={props.profile.contacts.twitter}><i class="fab fa-twitter-square"></i></a> : null}
            {props.profile.contacts.instagram ? <a href={props.profile.contacts.instagram}><i class="fab fa-instagram"></i></a> : null}
            {props.profile.contacts.youtube ? <a href={props.profile.contacts.youtube}><i class="fab fa-youtube"></i></a> : null}
            {props.profile.contacts.github ? <a href={props.profile.contacts.github}><i class="fab fa-github-square"></i></a> : null}
            {props.profile.contacts.mainLink ? <a href={props.profile.contacts.mainLink}><i class="fas fa-external-link-square-alt"></i></a> : null}
          </div>
          {props.profile.userId == props.authId ?
            <div className={styles.editButton}>
              <NavLink to='/edit'><button>Edit Profile</button></NavLink>
            </div> : null}
        </div>
      </div>
      <div className={uploadMode ? styles.popUpUploadAvatarContainer : styles.hidden} onClick={offUploadMode} data-click={'parent'}>
        <div className={styles.popUpUploadAvatar}>
          <input type='file' accept='image/*,image/jpeg' />
          <button onClick={onUploadanAvatar}>Отправить</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo;