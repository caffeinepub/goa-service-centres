import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

actor {
  type ServiceRequest = {
    id : Nat;
    serviceName : Text;
    name : Text;
    phone : Text;
    address : Text;
    problemDescription : Text;
    timestamp : Time.Time;
  };

  let serviceRequests = List.empty<ServiceRequest>();
  var nextId = 0;

  public shared ({ caller }) func submitServiceRequest(
    serviceName : Text,
    name : Text,
    phone : Text,
    address : Text,
    problemDescription : Text,
  ) : async () {
    let request : ServiceRequest = {
      id = nextId;
      serviceName;
      name;
      phone;
      address;
      problemDescription;
      timestamp = Time.now();
    };

    serviceRequests.add(request);
    nextId += 1;
  };

  public query ({ caller }) func getAllServiceRequests() : async [ServiceRequest] {
    if (serviceRequests.isEmpty()) {
      Runtime.trap("No service requests found. Please check back later.");
    };
    serviceRequests.toArray();
  };
};
