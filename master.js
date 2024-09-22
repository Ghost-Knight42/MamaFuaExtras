import java.util.*;

// Class to represent a user profile with additional details
class UserProfile {
    private String username;
    private String bio;          // Short biography of the user
    private String interests;   // User interests for better matching

    // Constructor to initialize the user profile
    UserProfile(String username, String bio, String interests) {
        this.username = username;
        this.bio = bio;
        this.interests = interests;
    }

    // Method to display user profile details
    public void displayProfile() {
        System.out.println("Username: " + username);
        System.out.println("Bio: " + bio);
        System.out.println("Interests: " + interests);
    }

    public String getUsername() {
        return username;
    }
}

// Class to manage user interactions
class InteractionManager {
    private Map<String, UserProfile> userProfiles = new HashMap<>();
    private Set<String> smashedUsers = new HashSet<>();  // Tracks users who have smashed others
    private Scanner scanner = new Scanner(System.in);

    // Method to add a user profile to the system
    public void addUserProfile(UserProfile profile) {
        userProfiles.put(profile.getUsername(), profile);
    }

    // Method to simulate pressing "smash" on a user
    public void pressSmash(String currentUser, String targetUser) {
        if (userProfiles.containsKey(targetUser)) {
            System.out.println(currentUser + " has pressed smash on " + targetUser);
            notifyUser(targetUser, currentUser);
        } else {
            System.out.println("Target user not found.");
        }
    }

    // Notify the user that they've been smashed and who smashed them
    private void notifyUser(String username, String currentUser) {
        System.out.println("Notification: " + username + ", you have been smashed by " + currentUser + "!");
        smashedUsers.add(username);  // Track the user who has been smashed
    }

    // Handle a user smashing back and potentially starting a chat
    public void smashBack(String currentUser, String targetUser) {
        if (userProfiles.containsKey(targetUser)) {
            System.out.println(currentUser + " has smashed back " + targetUser);
            startChat(currentUser, targetUser);
        } else {
            System.out.println("Target user not found.");
        }
    }

    // Start a chat session between two users
    private void startChat(String user1, String user2) {
        System.out.println("Chat started between " + user1 + " and " + user2);
        // Initialize chat system or UI
        System.out.println("You can now exchange messages.");
        // For simplicity, let's simulate a chat session
        simulateChat(user1, user2);
    }

    // Simulate a chat session (console-based for simplicity)
    private void simulateChat(String user1, String user2) {
        System.out.println("Enter 'exit' to end the chat.");
        while (true) {
            System.out.println(user1 + ": ");
            String messageFromUser1 = scanner.nextLine();
            if (messageFromUser1.equalsIgnoreCase("exit")) break;
            System.out.println(user2 + ": ");
            String messageFromUser2 = scanner.nextLine();
            if (messageFromUser2.equalsIgnoreCase("exit")) break;
        }
        System.out.println("Chat ended.");
    }

    // Method to view a user profile and optionally smash them
    public void viewProfileAndSmash(String currentUser, String targetUser) {
        if (userProfiles.containsKey(targetUser)) {
            UserProfile profile = userProfiles.get(targetUser);
            profile.displayProfile();
            System.out.println("Do you want to smash " + targetUser + "? (yes/no)");
            String response = scanner.nextLine();
            if (response.equalsIgnoreCase("yes")) {
                pressSmash(currentUser, targetUser);
            } else {
                System.out.println("No smash action taken.");
            }
        } else {
            System.out.println("User profile not found.");
        }
    }
}

// Main class to demonstrate the application
public class Main {
    public static void main(String[] args) {
        InteractionManager manager = new InteractionManager();

        // Adding sample profiles
        UserProfile user1 = new UserProfile("Alice", "Adventurer and foodie", "Traveling, Cooking");
        UserProfile user2 = new UserProfile("Bob", "Tech enthusiast", "Programming, Gaming");
        UserProfile user3 = new UserProfile("Charlie", "Fitness fanatic", "Running, Yoga");
        
        manager.addUserProfile(user1);
        manager.addUserProfile(user2);
        manager.addUserProfile(user3);

        // Simulate user interactions
        System.out.println("Simulating interactions...");

        // Alice presses smash on Bob
        manager.pressSmash("Alice", "Bob");

        // Bob smashes back Alice
        manager.smashBack("Bob", "Alice");

        // View Charlie's profile and decide to smash
        manager.viewProfileAndSmash("Alice", "Charlie");
    }
}
