import SocialSearch from './SocialSearch'
import ScrollButtonTop from '../Profile/ScrollButtonTop'

export default function Social ({ users, viewUser, setViewUser }) {
  return (
    <>
      <div className='outer'>
        <SocialSearch users={users} viewUser={viewUser} setViewUser={setViewUser} />
        <ScrollButtonTop />
      </div>
    </>
  )
}
