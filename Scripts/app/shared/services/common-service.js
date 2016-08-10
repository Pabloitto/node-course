module.exports = {
    imports: ['$http'],
    body: function ($http) {

        function doPost(p) {
            return $http.post(p.url, p.data).then(function (response) {
                return response.data;
            });
        }

        function doGet(p) {
            return $http.get(p.url).then(function (response) {
                return response.data;
            });;
        }

        return {
            doPost: doPost,
            doGet: doGet
        };
    }
};
