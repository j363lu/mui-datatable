This is a csv-viewer implemented by React. It is deployed on https://metrics.syn.uwaterloo.ca/csv-viewer/

This application uses mui-datatable and recharts. The documentation can be found here:

https://recharts.org/en-US/guide

https://github.com/gregnb/mui-datatables

# Installing and deploying
You may clone the repository to your local machine and then deploy the build to aqua99 (assuming you have Node.js installed on your local machine). After cloning the repository, run the following commands:

1. Install the dependencies
   
   `npm install`
2. Build the static HTML, CSS, JavaScript files
   
   `npm run build`
3. Deploy the build to aqua99 using the bash script deploy.sh
   
   `bash deploy.sh`


