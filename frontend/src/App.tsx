
import AlertDismissibleExample from './Alert/ErrorAlert'
import SubmitButton from './Buttons/SubmitButton'
import InputModal from './Modal/InputModal'
import TopNavbar from './Navbar/TopNavbar'
import SuccessToast from './Toast/SuccessToast'
import TextCollapse from './Collapse/TextCollapse'


function App() {

  return (
    <>
      <TopNavbar />
      <h1>Hello and welcome</h1>
      <SuccessToast />
      <AlertDismissibleExample />
      <SubmitButton />
      <InputModal />
      <TextCollapse />
    </>
  )
}

export default App
