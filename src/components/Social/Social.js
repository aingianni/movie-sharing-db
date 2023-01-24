import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import SocialSearch from './SocialSearch'

export default function Social ({ setSocialTab, socialTab, users }) {
    
    const handleSocialTab = () => {
        if (socialTab === 0) {
          return 82
        } else {
          return 0
        }
      }

  return (
    <>
      <div className='outer'>
        <SocialSearch users={users} />
      </div>

        <div className='chevron-holder' onClick={() => setSocialTab(handleSocialTab())}>
          <ArrowCircleRightIcon />
        </div>
    </>
  )
}
