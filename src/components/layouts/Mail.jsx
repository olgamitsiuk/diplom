

export function Mail () {

    return <div className="col-md-6  1probootstrap-animate">
        <form action="#" method="post" className="probootstrap-form probootstrap-form-box mb60">
            <div className="row mb-3">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="firstName" className="sr-only sr-only-focusable">First
                            Name</label>

                        <input  type="text" className="form-control" id="firstName"
                               name="firstName"
                               placeholder="First Name"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="lastName" className="sr-only sr-only-focusable">Last
                            Name</label>
                        <input  type="text" className="form-control" id="lastName"
                               name="lastName"
                               placeholder="Last Name"/>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="email" className="sr-only sr-only-focusable">Email</label>
                <input type="email" className="form-control" id="email" name="email"
                       placeholder="Email"/>
            </div>
            <div className="form-group">
                <label htmlFor="text_message" className="sr-only sr-only-focusable">Message</label>
                <textarea  cols="30" rows="10" className="form-control"
                          id="text_message" name="text_message"
                          placeholder="Write your message"></textarea>
            </div>
            <div className="form-group">
                <input type="button"  className="btn btn-primary" id="button"
                       name="button"
                       value="Send Message"/>
            </div>
        </form>
    </div>
}