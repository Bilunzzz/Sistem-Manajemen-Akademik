const Form = ({ id, onSubmit = "", children }) => {
  return (
    <form id={id} className="space-y-4" onSubmit={(event) => onSubmit(event)}>
      {children}
    </form>
  );
};
export default Form;
