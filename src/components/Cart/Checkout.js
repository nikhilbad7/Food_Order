import {useRef,useState} from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {

	const [formInputsValidiity,setFormInputsValidity] = useState({
		name: true,
		street: true,
		city: true,
		postalCode: true
	});

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalCodeInputRef = useRef();
	const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
    	name: enteredNameIsValid,
    	street: enteredStreetIsValid,
    	city: enteredCityIsValid,
    	postalCode: enteredPostalCodeIsValid
    });

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;
     if(!formIsValid){
     	return;
     }

     props.onConfirm({
     	name: enteredName,
     	street: enteredStreet,
     	city: enteredCity,
     	postalCode: enteredPostalCode
     });
  };

const nameControlClasses = `${classes.control} ${formInputsValidiity.name ? '' : classes.invalid}`;
const streetControlClasses = `${classes.control} ${formInputsValidiity.street ? '' : classes.invalid}`;
const cityControlClasses = `${classes.control} ${formInputsValidiity.city ? '' : classes.invalid}`;
const postalCodeControlClasses = `${classes.control} ${formInputsValidiity.postalCode ? '' : classes.invalid}`;


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        { !formInputsValidiity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        { !formInputsValidiity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
        { !formInputsValidiity.postalCode && <p>Please enter a valid postal Code (5 characters long)</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        { !formInputsValidiity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;