import SocialSearch from './SocialSearch'

export default function Social ({ users, viewUser, setViewUser }) {
  return (
    <>
      <div className='outer'>
        <SocialSearch users={users} viewUser={viewUser} setViewUser={setViewUser} />
      </div>
    </>
  )
}
