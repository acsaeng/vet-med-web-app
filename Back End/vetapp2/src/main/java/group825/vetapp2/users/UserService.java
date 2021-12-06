package group825.vetapp2.users;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import group825.vetapp2.treatment.Treatment;

//import group825.vetapp.animal.comments.Comment;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Service that performs User requests
 *
 * @author Aron Saengchan, Jimmy Zhu, Timothy Mok
 * @version 2.0
 * @since December 6, 2021
 */
@Service
public class UserService {

    /**
     * User repository that accesses the database
     */
    private final UserRepository repo;

    /**
     * Constructor that initializes the UserService
     * @param repo repository that accesses the database
     */
    public UserService(@Qualifier("tempUserRepo") UserRepository repo) {
        this.repo = repo;
    }

    /**
     * Verifies a user's email and password information
     * @param email user's email
     * @param password user's password
     * @return 1 if login was successful, 0 otherwise
     * @throws Exception when there is an SQL Exception
     */
    public List<User> loginUser(String email, String password) throws Exception{
    	ArrayList<String> results =  this.repo.loginUser(email, password);
		List<User> listResults = createListUser(results);
		return listResults;
//        return this.repo.loginUser(email, password);
    }

    /**
     * Retrieves all stored users from the database
     * @return a list of all stored users
     * @throws Exception when there is an SQL Exception
     */
    public List<User> selectAllUsers() throws Exception {
    	ArrayList<String> results =  repo.selectAllUsers();
		List<User> listResults = createListUser(results);
		return listResults;
    }

    /**
     * Adds a user to the database
     * @param user user to be added
     * @return 1 if registration was successful, 0 otherwise
     * @throws Exception when there is an SQL Exception
     */
    public int addUser(User user) throws Exception {
        return this.repo.addUser(user);
    }

    /**
     * Updates a user's information
     * @param id user's existing ID
     * @param user User object with new information
     * @throws Exception when there is an SQL Exception
     */
    public int editUser(int id, User user) throws Exception {
        return this.repo.editUser(id, user);
    }
    
    /**
	  * Create a list of User objects from ArrayList<String> returned from database query
	 * @param foundResults = ArrayList<String> preprocessed response from database of all returned tuples as an ArrayList of Strings
	 * @return ArrayList<Comment> where each object was created from the data in each String from the ArrayList input
	 */
    public List<User> createListUser(ArrayList<String> foundResults){
    	List<User> listResults = new ArrayList<User>(); 
    	//review against Database setup
    	int idx_id=0, idx_firstName=1, idx_lastName=2, idx_userType=3, idx_userName=4, idx_email=5, 
    			idx_phoneNum=6, idx_password=7, idx_startDate=8, idx_userStatus=9;
    	for (String result: foundResults) {
    		
    		String[] resultSplit = result.split(repo.getSplitPlaceholder());
    		User temp;
    		try{
	    		temp =  new User( Integer.valueOf(resultSplit[idx_id]), resultSplit[idx_firstName], resultSplit[idx_lastName], resultSplit[idx_userType], 
		    			resultSplit[idx_userName], resultSplit[idx_email], resultSplit[idx_phoneNum], resultSplit[idx_password], resultSplit[idx_startDate], resultSplit[idx_userStatus]);
	    	}catch(NumberFormatException e) {
//	    		System.out.println("nothing returned");
	    		temp = new User(0, null, null, null, null, null, null, null, null, null);
	    	}
	    	listResults.add(temp);
    }
    System.out.println("\nPrepared List to send as json response to API endpoint:");
    System.out.println(listResults);

    return listResults;
    }
    
}