const LayoutWrapper = (props :any) => {
  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
        {props.children}
    </div>
  )
}

export default LayoutWrapper