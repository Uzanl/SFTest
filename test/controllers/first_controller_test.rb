require "test_helper"

class FirstControllerTest < ActionDispatch::IntegrationTest
  test "should get welcome" do
    get first_welcome_url
    assert_response :success
  end
end
