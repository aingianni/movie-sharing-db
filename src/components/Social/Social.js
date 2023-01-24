import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'

export default function Social ({ setSocialTab, socialTab }) {
    
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
        <h3>Social Tab</h3>
        social content goes here
      </div>

        <div className='chevron-holder' onClick={() => setSocialTab(handleSocialTab())}>
          <ArrowCircleRightIcon />
        </div>
    </>
  )
}
