package timecapsule.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import timecapsule.model.Capsule;

public interface CapsuleRepository extends MongoRepository<Capsule, String> {

}