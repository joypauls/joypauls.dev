+++
title = "Contact"
aliases = ["get in touch","contact me","contact"]
[ author ]
  name = "Joy Paulsen"
+++

{{< rawhtml >}}
<form name="contact" class="contact-form width-normal" action="/thank-you/" method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="contact" />
    <!-- Text input-->
    <div class="form-group">
        <label class="col-md-4 control-label" for="Name">Name</label>
        <div class="col-md-6">
            <input id="contact-form-name" name="Name" type="text" placeholder="Name" class="form-control input-md" required="" autocomplete="off">
        </div>
    </div>
    <!-- Text input-->
    <div class="form-group">
        <label class="col-md-4 control-label" for="Email">Email</label>
        <div class="col-md-4">
            <input id="contact-form-email" name="Email" type="email" placeholder="Email Address" class="form-control input-md" required="" autocomplete="off">
        </div>
    </div>
    <!-- Textarea -->
    <div class="form-group">
        <label class="col-md-4 control-label" for="">Message</label>
        <textarea class="form-control" id="contact-form-message" name="Message" placeholder="What's up?" rows="8"></textarea>
    </div>
    <!-- Button -->
    <div class="form-group">
        <button type="submit" value="Submit" id="Form-submit">Submit</button>
    </div>
</form>
{{< /rawhtml >}}
